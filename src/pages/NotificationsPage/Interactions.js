

const Interactions = ({interactions, handleViewProfile, handleDeleteNotification, loading}) => {
    return (
        <div>
            {interactions.length > 0 ? (
                <ul>
                {interactions.map((interaction) => (
                    <li key={interaction.notificationId}>
                        { interaction.profilePicture ? 
                            <img src={interaction.profilePicture} alt='profile' className='mini-profile-picture' onClick={() => handleViewProfile(interaction.userId)} style={{cursor:"pointer", width:"fitContent", minWidth:"3rem"}}/> 
                            : 
                            <img src='https://via.placeholder.com/100' alt='profile' className='mini-profile-picture' onClick={() => handleViewProfile(interaction.userId)} style={{cursor:"pointer", width:"fitContent", minWidth:"3rem"}}/> }
                        {interaction.type === 'like' 
                            && <p className='notification-text'>{interaction.firstName} {interaction.lastName} σημείωσε το ενδιαφέρον του σε μία από τις αναρτήσεις σας</p>}
                        {interaction.type === 'comment' 
                            && <div style={{flex:"1"}}>
                                <p className='notification-text'>{interaction.firstName} {interaction.lastName} σχολίασε σε μία από τις αναρτήσεις σας: </p>
                                <p className='comment-container'>{interaction.commentContent}</p>
                            </div>
                        }
                        <span className='date-span'>{interaction.createdAt}</span>
                        <button className='delete-button' onClick={() => handleDeleteNotification(interaction)}>x</button>
                    </li>
                ))}
                </ul>
            ) : (
                !loading &&
                <p className='notification-text'>Δεν έχετε κάποια νέα ειδοποίηση</p>
            )}
        </div>
    );
};

export default Interactions;