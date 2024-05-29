import {Html, Head, Body, Container, Text, Img} from '@react-email/components'
import * as React from "react"

const EmailInscription = ({nom, prenom, text}) => {
    return (
        <Html lang="fr" dir="ltr">
            <Head/>
            <Body style={main}>
                <Container>
                    <Img
                        src="cid:logo_judo"
                        width="170"
                        height="69"
                        alt="Logo Judo"
                        style={logo}
                    />
                    <h2>Judo Inscription</h2>
                        <Text style={paragraph}>Bienvenue dans notre club de Judo!</Text>
                        <Text style={paragraph}>Nous sommes ravis de vous avoir avec nous.</Text>
                        <Text style={paragraph}>Votre inscription au nom de {prenom} {nom} a bien été enregistré !</Text>
                        <Text style={important}>{text}</Text>
                    <h2>Informations complémentaires:</h2>
                        <h3>Autorisation du droit à l’image</h3>
                            <Text style={paragraph}>
                                L’ensemble des photos et vidéos sont susceptibles d’être publiées sur nos réseaux sociaux et
                                site internet. Par soucis d’efficacité, merci de signaler auprès du professeur principal votre
                                opposition à toutes diffusions de votre image ou à celle de votre enfant.
                                Sans ce signalement préalable, le Cercle du Judo de Vesoul considérera pouvoir en bénéficier de
                                votre droit à l’image dans ces publications non commerciales.
                            </Text>
                        <h3>Situation d’accident sportif</h3>
                            <Text style={paragraph}>
                                Nous nous devons d’assurer la sécurité et l’intégrité physique de nos adhérents et nous
                                ne sommes pas en mesure d’évaluer l’état clinique du blessé, en conséquence, le Cercle du Judo
                                de Vesoul appellera systématiquement les pompiers en cas d’accident sportif le nécessitant.
                                Il ne pourra être tenu responsable en cas d’opposition de votre part.
                            </Text>
                            <br/>
                            <Text style={paragraph}>
                                Le cercle du Judo
                            </Text>
                </Container>
                <footer style={footer}>
                    <div style={divFooter}>
                        <Text style={titreFooter}>Coordonées </Text>
                        <Text style={sousTitreFooter}>adresse </Text>
                        <Text style={paragraphFooter}>
                            Cercle du Judo
                            <br/>
                            Maison des Associations - 53, rue Jean Jaurès
                            <br/>
                            70000 - Vesoul
                        </Text>
                        <Text style={sousTitreFooter}>Téléphone</Text>
                        <Text style={paragraphFooter}>06 63 42 54 32</Text>
                    </div>
                </footer>
            </Body>
        </Html>
    )
}

const main = {
    backgroundColor: "#efefef",
    fontFamily: "Karla,HelveticaNeue,Helvetica,Arial,sans-serif",
    color : '#343232'
}

const logo = {
    margin: "0 auto",
    alignItems: 'center',
}

const paragraph = {
    fontSize: "18px",
    letterSpacing: "0",
    lineHeight: "23px",
    padding: "0 10px",
    margin: "0",
    textAlign: "justify",
}

const important = {
    backgroundColor: "#d60040",
    color: "#efefef",
    fontWeight: "700",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center",
    fontSize: "1em"
}

const footer = {
    backgroundColor: '#606060',
    color : '#efefef',
    fontSize: ".95em",
    marginTop: "20px",
    fontFamily: "Karla,HelveticaNeue,Helvetica,Arial,sans-serif",
}

const divFooter = {
    width: "300px",
    alignItems: "center",
    margin: "auto",
    paddingTop: "10px",
    paddingBottom: "10px"
}

const titreFooter = {
    fontSize: "1.5em",
    fontWeight: "500",
    marginBottom: '6px',
    textTransform: "uppercase"
}

const sousTitreFooter = {
    fontWeight: "300",
    marginBottom: '5px',
    textTransform: "uppercase"
}

const paragraphFooter = {
    textAlign: "left",
    letterSpacing: "0",
    lineHeight: "23px",
    margin: '5px 0 5px 0'
}

export default EmailInscription
