
const Message = ({message, image}) => {

    return(
        <div>
            <h3>Message important :</h3>
            <div>
                <p>{message.text}</p>
                <img src={image.url} alt={image.alt}/>
            </div>
        </div>
    )
}

export default Message