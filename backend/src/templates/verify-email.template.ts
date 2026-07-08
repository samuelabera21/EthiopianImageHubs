export function verifyEmailTemplate(
  username: string,
  verificationUrl: string,
) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Verify Email</title>
</head>

<body
style="
font-family:Arial,sans-serif;
background:#f5f5f5;
padding:40px;
">

<div
style="
max-width:600px;
margin:auto;
background:white;
padding:40px;
border-radius:8px;
">

<h2>
Welcome to EthiopiaHub Images!
</h2>

<p>
Hello <strong>${username}</strong>,
</p>

<p>
Thank you for registering.
</p>

<p>
Please verify your email by clicking the button below.
</p>

<p
style="margin:35px 0;"
>

<a
href="${verificationUrl}"

style="
background:#2563eb;
color:white;
padding:14px 24px;
text-decoration:none;
border-radius:6px;
display:inline-block;
">

Verify Email

</a>

</p>

<p>
If you didn't create this account,
ignore this email.
</p>

<hr>

<p
style="
font-size:12px;
color:#777;
"
>

EthiopiaHub Images

</p>

</div>

</body>
</html>
`;
}