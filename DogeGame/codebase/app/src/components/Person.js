import React from 'react';

const Person = ({ person }) => {

  const punchline = () => {
    if (person.punchline === '0hf') return (
      <>
        Get rich - trade ThunderTokens on <a rel="noopener noreferrer" target='_blank' href='https://www.huobi.com/en-us/topic/invited/?invite_code=f5v27'>Houbi</a>
      </>
    )

    if (person.punchline === '0bf') return (
      <>
        Get rich - trade Bitcoin on <a rel="noopener noreferrer" target='_blank' href='https://www.binance.com/en/register?ref=42137560'>Binance</a>
      </>
    )

    return person.punchline
  }

  return (
    <div className='person mb-3'>
      <h4 className='punchline'>
        <table>
          <tbody>
            <tr>
              <td>
                { punchline() }
              </td>
            </tr>
          </tbody>
        </table>
      </h4>
      <div className="circle">
        <img className='portrait' src={'/persons/' + person.image + '.png?2'} alt={'image of ' + person.name} />
      </div>
    </div>
  )
}

export default Person
