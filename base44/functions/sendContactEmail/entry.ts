Deno.serve(async (req) => {
  try {
    const { name, email, phone, message, sessionType, sessionDuration, coachName } = await req.json();

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
${message || 'No additional message provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to this client at: ${email}
    `.trim();

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Tauber Solutions <dunger@taubersolutions.com>',
        to: ['office@taubersolutions.com'],
        reply_to: email,
        subject: `New Coaching Request - ${name}`,
        text: body,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Resend API error');
    }

    return Response.json({ success: true, id: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});