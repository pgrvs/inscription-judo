import React, {useEffect, useState} from 'react'
import {rechercheAdherents, getResponsablesByIdAdherent} from "../../API/RequetesAPI"
import Nav from '../Navigation'
import {splitName, convertTimestampToDate, capitalize, informationsRecevoirParMailToObject} from "../../common/utils"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import style from '../../styles/inscription/Recherche-adherent.module.scss'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import AjoutAdherent from "../../assets/AjoutAdherent";

const RechercheAdherent = ({ donneesRecherche, onSuivant }) => {
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [numeroLicence, setNumeroLicence] = useState('')
    const [resultats, setResultats] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetcheData()
    }, [nom, prenom, numeroLicence])

    const fetcheData = async () => {
        setLoading(true)
        let results = []
        if (nom || prenom || numeroLicence) {
            try {
                results = await rechercheAdherents(prenom, nom, numeroLicence)
            } catch (error) {
                console.error("Erreur lors de la recherche des adhérents:", error)
            }
        }
        setResultats(results)
        setLoading(false)
    }

    useEffect(() => {
        if (Object.keys(donneesRecherche).length !== 0) {
            setPrenom(donneesRecherche.prenom)
            setNom(donneesRecherche.nom)
            setNumeroLicence(donneesRecherche.numeroLicence)
        }
    }, [donneesRecherche])

    const handleChangeNom = (e) => {
        const upperCaseNom = e.target.value.toUpperCase()
        setNom(upperCaseNom)
    }

    const handleChangePrenom = (e) => {
        setPrenom(capitalize(e.target.value))
    }

    const handleChangeNumeroLicence = (e) => {
        setNumeroLicence(e.target.value)
    }

    const handleClickSuivant = async (adherent) => {
        const recherche = {
            'nom': nom,
            'prenom': prenom,
            'numeroLicence': numeroLicence
        }

        let idAdherent = null
        let responsablesAPI = {}
        let responsables = []

        if (adherent) {
            idAdherent = adherent.id
            const {prenom, nom} = splitName(adherent.name)
            adherent = {
                nom: nom,
                prenom: prenom,
                dateDeNaissance: convertTimestampToDate(adherent.array_options.options_datedenaissance),
                rue: adherent.address,
                codePostal: adherent.zip,
                ville: adherent.town,
                numeroTelephone: adherent.phone,
                adresseEmail: adherent.email,
                couleurCeinture: adherent.array_options.options_couleurdelaceinture,
                poids: adherent.array_options.options_poidsenkilogramme,
                genre: adherent.array_options.options_genre,
                droitImage: adherent.array_options.options_droitimage,
                numroAdhrent: adherent.array_options.options_numroadhrent
            }
            responsablesAPI = await getResponsablesByIdAdherent(idAdherent)
            if (responsablesAPI.length > 0){
                responsablesAPI.forEach((responsable) => {
                    let responsableData = {}
                    responsableData = {
                        id : responsable.id,
                        prenom : responsable.firstname,
                        nom : responsable.lastname,
                        rue: responsable.address,
                        codePostal: responsable.zip,
                        ville: responsable.town,
                        numeroTelephone: [responsable.phone_perso, responsable.phone_mobile],
                        adresseEmail: responsable.mail,
                        informations: informationsRecevoirParMailToObject(responsable.array_options.options_recevoirparmail)
                    }
                    responsables.push(responsableData)
                })
            }
        }
        onSuivant({idAdherent, recherche, adherent, responsables})
    }

    return (
        <div>
            <Nav
                partieActuelle={1}
                afficherPartie={1}
                lienVersPagePrecedente={'/'}
            />

            <div className="container">
                <div>
                    <h1>Recherche adhérent</h1>
                    <div className={"encadrementPrincipal"}>
                        <div className={"containerForm"}>
                            <label>Entrer le Nom et Prénom :</label>
                            <input
                                type="text"
                                value={nom}
                                onChange={handleChangeNom}
                                placeholder="Nom"
                            />
                            <input
                                type="text"
                                value={prenom}
                                onChange={handleChangePrenom}
                                placeholder="Prénom"
                            />
                            <label>Entrer le numéro de licence :</label>
                            <input
                                type="text"
                                value={numeroLicence}
                                onChange={handleChangeNumeroLicence}
                                placeholder="Numero de licence"
                            />
                        </div>
                        <div className={style.swiperContainer}>
                            <div className={style.swiperDiv}>
                                {loading
                                    ? <div className={"loader"}></div>
                                    : (
                                        <>
                                            {(resultats.length > 0 && resultats !== undefined) && (
                                                <>
                                                    <Swiper
                                                        className={style.swiperContainerCards}
                                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                        breakpoints={{
                                                            // quand la largeur de la page est >= 1500px
                                                            1500: {slidesPerView: 3,},
                                                            1000: {slidesPerView: 2,},
                                                            700: {slidesPerView: 1,},
                                                            0: {slidesPerView: 1,},
                                                        }}
                                                        scrollbar={{draggable: true}}
                                                        navigation={{
                                                            nextEl: '.swiper-button-next',
                                                            prevEl: '.swiper-button-prev',
                                                        }}
                                                    >
                                                        {resultats.map((adherent) => (
                                                            <SwiperSlide key={adherent.id}>
                                                                <button className={style.cardAdherent}
                                                                        onClick={() => handleClickSuivant(adherent)}>
                                                                    <p className={style.nomAdherent}>{adherent.name}</p>
                                                                    <p className={style.infoAdherent}>{adherent.email}</p>
                                                                    <p className={style.infoAdherent}>{adherent.array_options.options_numroadhrent}</p>
                                                                </button>
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                    <div className={`swiper-button-next ${style.buttonNext}`}></div>
                                                    <div className={`swiper-button-prev ${style.buttonPrev}`}></div>
                                                </>
                                            )}
                                            {(resultats.length === 0 && (nom === '' && prenom === '' && numeroLicence === '')) && (
                                                <p className={style.messageRecherche}>Entrer une recherche pour trouver des adhérents</p>
                                            )}
                                            {(resultats.length === undefined && (nom !== '' || prenom !== '') && (numeroLicence === '')) && (
                                                <p className={style.messageRecherche}>Aucun adhérent trouvé au nom de {nom} {prenom}</p>
                                            )}
                                            {(resultats.length === undefined && (numeroLicence !== '')) && (
                                                <p className={style.messageRecherche}>Aucun adhérent trouvé avec le numéro de licence : {numeroLicence}</p>
                                            )}
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <button className={"buttonNoir"} onClick={() => handleClickSuivant(null)}>
                            <AjoutAdherent className={"iconeAjout"} alt="Ajout adherent"/>
                            <p>Créer un nouvel adhérent</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RechercheAdherent
