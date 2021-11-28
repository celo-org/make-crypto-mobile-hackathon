

const Input = ({ index, name, address, amount }: { index: number, name: Array<string>, address: Array<string>, amount: Array<string> }) => <>
    <input className="border text-black px-3 py-1 rounded-md" placeholder="Name" defaultValue={name[index]} type="text" name={`name__${index}`} onChange={(e) => name[index] = e.target.value} required />
    <input className="border text-black px-3 py-1 rounded-md" placeholder="Address" defaultValue={address[index]} type="text" name={`address__${index}`} onChange={(e) => address[index] = e.target.value} required />
    <input className="border text-black px-3 py-1 rounded-md" placeholder="Amount" defaultValue={amount[index]} type="number" name={`amount__${index}`} onChange={(e) => amount[index] = e.target.value} required step={'any'} min={0} />
    <div></div>
</>

export default Input;