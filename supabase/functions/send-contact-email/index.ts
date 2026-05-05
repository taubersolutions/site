import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, sessionType, sessionDuration, coachName } = await req.json();

    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, phone" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = `
New Coaching Request Received

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT INFORMATION:
Name: ${name}
Email: ${email}
Phone: ${phone}

SESSION DETAILS:
Type: ${sessionType}
Duration: ${sessionDuration}
Preferred Coach: ${coachName}

MESSAGE:
${message || "No additional message provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to this client at: ${email}
    `.trim();

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tauber Solutions <dunger@taubersolutions.com>",
        to: ["office@taubersolutions.com"],
        reply_to: email,
        subject: `New Coaching Request - ${name}`,
        text: body,
      }),
    });

    const result = await resendResponse.json();

    if (!resendResponse.ok) {
      throw new Error(result.message || "Resend API error");
    }

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
