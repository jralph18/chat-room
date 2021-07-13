import React, { useEffect, useState } from 'react'
import { auth } from '../service/firebase'
import { db } from '../service/firebase'
import { readChats } from '../helpers/db'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import '../chat.css'


// const useStyles = makeStyles((theme) => ({
//     button: {
//       margin: theme.spacing(1),
//     },
//   }));

function Chat() {
    const [user, setUser] = useState(auth().currentUser);
    const [chats, setChats] = useState([]);
    const [content, setContent] = useState('');
    const [readError, setReadError] = useState(null);
    const [writeError, setWriteError] = useState(null);

    // const classes = useStyles();

    useEffect(() => {
        setReadError(null);
        try{
            db.ref("chats").on("value", snapshot => {
                let chatArr = [];
                snapshot.forEach((snap) => {
                    chatArr.push(snap.val());
                })
                setChats(chatArr);
            })
        } catch (error) {
            setReadError(error.message);
        }
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setWriteError(null);
        try {
            db.ref("chats").push({
                content: content,
                timestamp: Date.now(),
                uid: user.uid,
                sender: user.email
            })
            setContent("");
        } catch (error) {
            setWriteError(error.message);
        }
    }

    return (
        <div>
            <Header />
            <div className="app">
                <div className="chat-elements">
            <div className="current-user">
                <p>Logged in as: <strong>{user.email}</strong></p>
            </div>
                <div className="chats">
                    {chats.map(chat => {
                        let type = chat.uid === user.uid ? "myChat" : "yourChat";
                        return <div key={chat.timestamp} className={type + " text"}>    
                                <p className="sender">{chat.sender}</p>
                                <p className="content">{chat.content}</p>
                                </div>
                    })}
                </div>
                
            
            <form className="chatBar" onSubmit={handleSubmit}>
                <TextField
                    id="outlined-full-width"
                    placeholder="Type message..."
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon style={{ color: grey[300] }}>send</Icon>   
                          </InputAdornment>
                        ),
                      }}
                    variant="outlined"
                    onChange={handleChange}
                    value={content}
                    className="message-bar"
                />
                {writeError ? <p>{writeError}</p> : null}
                {readError ? <p>{readError}</p> : null}
            </form>
            </div>
            </div>
            <div className="chat-footer">
            <Footer/>
            </div>
        </div>
    )
}

export default Chat
