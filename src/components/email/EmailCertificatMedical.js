import {Html, Head, Body, Container, Text, Img} from '@react-email/components'
import * as React from "react"

const EmailCertificatMedical = ({nom, prenom}) => {
    return (
        <Html lang="fr" dir="ltr">
            <Head/>
            <Body style={main}>
                <Container>
                    <Img
                        src='cid:logo_judo'
                        width="170"
                        height="69"
                        alt="Logo Judo"
                        style={logo}
                    />
                    <h2>Judo Inscription</h2>
                    <Text style={paragraph}>Certificat médical obligatoire.</Text>
                    <Text style={important}>{prenom} {nom} a besoin d'apporter un certificat médical avant la première
                        scéance.</Text>
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
                        <Text style={sousTitreFooter}>Téléphone </Text>
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
    color: '#343232'
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

export default EmailCertificatMedical
