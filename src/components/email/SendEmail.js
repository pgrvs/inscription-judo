const sendEmail = async (to, subject, text, html, attachments) => {
    const response = await fetch(process.env.REACT_APP_API_EMAIL + 'send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, text, html, attachments }),
    })
    console.log(response)
    if (!response.ok) {
        console.error('Erreur lors de l\'envoi de l\'e-mail')
    } else {
        console.log('E-mail envoyé avec succès')
    }
}

export {sendEmail}