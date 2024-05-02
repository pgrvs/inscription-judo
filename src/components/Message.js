import QuestionnaireMedical from '../assets/QuestionnaireMedical'
import CertificatMedicalBarre from '../assets/CertificatMedicalBarre'
import CertificatMedical from '../assets/CertificatMedical'

const Message = ({message, image}) => {
    let content

    switch (image) {
        case 'questionnaire_medical':
            content = <QuestionnaireMedical width="75" height="75"/>
            break
        case 'certificat_medical':
            content = <CertificatMedical width="75" height="75"/>
            break
        case 'certificat_medical_barre':
            content = <CertificatMedicalBarre width="75" height="75"/>
            break
        default:
            break
    }

    return (
        <div>
            <h3>Message important :</h3>
            <div>
                <p>{message}</p>
                {content}
            </div>
        </div>
    )
}

export default Message