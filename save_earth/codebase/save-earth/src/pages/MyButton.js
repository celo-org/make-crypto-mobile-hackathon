import React, { useState } from "react";
import '../extra/css/font-awesome.min.css'

const ButtonLoader= ({ whenClicked, changecolor= false }) => {
  const [loadbutton, setLoadbutton] = useState(false);
  const [message, setMessage] = useState('');

  const switchStatements = (res) => {
    if (!res) {
      setMessage("Make sure to insert a link or an image")
    } else {
        switch(Math.round(res.probability * 100)) {
          case 100:
          setMessage(`I can say, with 💯% certainty, that you've just found a ${res.tagName}! `)
          break;
          case 99:
          setMessage(`Well, well... You've got a good eye... I'm pretty sure we've got a ${res.tagName} here `)
          break;
          case 98:
          setMessage(`The results are ready! It is definitely a ${res.tagName} `)
          break;
          case 97:
          setMessage(`After much inspection, It does look like a ${res.tagName} `)
          break;
          case 96:
          setMessage(`Did you say ${res.tagName}? It's likely your are right `)
          break; // NOTE: Values below 96 have a very low accuracy probability, so i decided to have fun 
          case 95:
          setMessage(`Chances are that, it might be the ${res.tagName}. Let's ask what Siri thinks 😊 `)
          break;
          case 94:
          setMessage(`It may or may not be a ${res.tagName}, even I don't know it all... 😞 `)
          break;
          case 93:
          setMessage(`Hey Cortana!, does this look like a ${res.tagName} to you? Please Hooman, wait a sec 🤡 `)
          break;
          case 92:
          setMessage(`I'd be surprised, if that's a ${res.tagName}. `)
          break;
          case 91:
          setMessage(`I would have asked Alex if this was a ${res.tagName}, But I doubt she knows either 😜 `)
          break;
          case 90:
          case 89:
          case 88:
          case 87:
          case 86:
          setMessage(`Is that a ${res.tagName}? So tired... I haven't slept in F.O.R.E.V.E.R!!! `)
          break;
          case 85:
          case 84:
          case 83:
          case 82:
          case 81:
          case 80:
          case 79:
          setMessage(`I could tell you that's a ${res.tagName}, but we both know it isn't 😜 `)
          break;
          case 78:
          case 77:
          case 76:
          case 75:
          case 74:
          case 73:
          case 72:
          case 71:
          setMessage(`Ummm... is that a ${res.tagName}? ....    a dinosaur?     Ahh... Where did I keep my glasses `)
          break;
          case 70:
          case 69:
          case 68:
          case 67:
          case 66:
          case 65:
          case 64:
          case 63:
          case 62:
          case 61:
          case 60:
          setMessage(`I wonder if Captcha is still asking if humans are robots, what's up with that... Oh yeah, it's definitely not a ${res.tagName}. `)
          break;
          case 59:
          case 58:
          case 57:
          case 56:
          case 55:
          case 54:
          case 53:
          case 52:
          setMessage(`There is no way that is a ${res.tagName}! `);
          break;
          case 51:
          case 50:
          case 49:
          case 48:
          case 47:
          case 46:
          case 45:
          case 44:
          setMessage(`It seems there might be something wrong with my Iteration, It doesn't have your data in it... yet... 😉 `);
          break;
          case 43:
          case 42:
          case 41:
          case 40:
          case 39:
          case 38:
          case 37:
          case 36:
          case 35:
          case 34:
          case 33:
          setMessage(`Roses are red, violets are blue, I might have to, recreate my iteration with you ...😉 `);
          break;
          case 11:
          case 10:
          case 9:
          case 8:
          case 7:
          case 6:
          case 5:
          case 4:
          case 3:
          case 2:
          case 1:
          setMessage(`Was this found in Tennessee? Because my prediction probability is below 10 as seen...😉 `);
          break;
          default:
          setMessage(`Sorry, I have no idea... I think it's time I learnt new things! `)

        }

    }
  }

  const fetchData = () => {
    setLoadbutton( true );

    // lets work with our values
    whenClicked().then( res => {
      setLoadbutton(false)

      // This shows message
      switchStatements(res)
      setTimeout(() => {
        setMessage("")

      }, 15000)

    })

  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button type="button" className={`btn-outline-${ changecolor ? "danger" : "success"} buttonloader`} onClick={fetchData} disabled={loadbutton}>
        {loadbutton && (
          <i
            className="fa fa-refresh fa-spin"
            style={{ marginRight: "5px" }}
          />
        )}
        {loadbutton && <span>Loading Data from AI</span>}
        {!loadbutton && <span>Send Data to AI 🤖</span>}
      </button>
      <div>
        <div className="typewriter ml-2 col-xs-12">
          <h4> { message }</h4>
        </div>
      </div>
    </div>
  );
}

export default ButtonLoader;
