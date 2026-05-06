export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message, sessionType, sessionDuration, coachName } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Tauber Solutions <onboarding@resend.dev>',
        to: ['office@taubersolutions.com'], // ← replace with the real recipient email
        subject: `New Coaching Request: ${sessionType} from ${name}`,
        html: `
          <h2>New Coaching Session Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Session Type:</strong> ${sessionType} (${sessionDuration})</p>
          <p><strong>Coach Preference:</strong> ${coachName}</p>
          <p><strong>Message:</strong> ${message || 'None'}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: error.message });
  }
}
