import React from 'react';

const Person = ({ person }) => {

  return (
    <div className='person mb-3'>
      <h4 className='punchline'>
        <table>
          <tbody>
            <tr>
              <td>
                { person.punchline }
              </td>
            </tr>
          </tbody>
        </table>
      </h4>
      <div className="circle">
        <img className='portrait' src={'/persons/' + person.image + '.png'} alt={'image of ' + person.name} />
      </div>
    </div>
  )
}

export default Person
