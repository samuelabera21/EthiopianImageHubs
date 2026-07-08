export function resetPasswordTemplate(
  username: string,
  resetUrl: string,
) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Reset Password</title>
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
Reset Your Password
</h2>

<p>
Hello <strong>${username}</strong>,
</p>

<p>
We received a request to reset your password.
</p>

<p
style="margin:35px 0;"
>

<a
href="${resetUrl}"

style="
background:#dc2626;
color:white;
padding:14px 24px;
text-decoration:none;
border-radius:6px;
display:inline-block;
">

Reset Password

</a>

</p>

<p>
If you did not request this,
you can safely ignore this email.
</p>

<p>
This link expires in 1 hour.
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