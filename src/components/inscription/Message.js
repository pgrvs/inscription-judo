import QuestionnaireMedical from '../../assets/QuestionnaireMedical'
import CertificatMedicalBarre from '../../assets/CertificatMedicalBarre'
import CertificatMedical from '../../assets/CertificatMedical'
import style from '../../styles/inscription/Message.module.scss'

const Message = ({message, image}) => {
    let content

    switch (image) {
        case 'questionnaire_medical':
            content = <QuestionnaireMedical width="100" height="100"/>
            break
        case 'certificat_medical':
            content = <CertificatMedical width="100" height="100"/>
            break
        case 'certificat_medical_barre':
            content = <CertificatMedicalBarre width="100" height="100"/>
            break
        default:
            break
    }

    return (
        <div className={style.divMessage}>
            <h3>Message important :</h3>
            <div>
                <p dangerouslySetInnerHTML={{ __html: message }}></p>
            </div>
            {content}
        </div>
    )
}

export default Message