import { csv } from 'd3-fetch'

class CSV {
    static async Import(file: File): Promise<string[][]> {
        return new Promise(async (resolve, reject) => {

            const url = URL.createObjectURL(file)

            const res = await csv(url)

            if (res) {
                if (res.columns[0].toLowerCase().includes("name;address;amount")) {
                    const result: string[][] = []
                    for (let index = 0; index < res.length; index++) {
                        const data = Object.values(res[index])[0]?.split(';')
                        if (data && data.length > 0) {
                            result.push(data)
                        }else{
                            reject(new Error(`Row is null`))
                        }
                    }
                    resolve(result)
                } else {
                    reject(new Error("Columns are invalid. Please, set the column order like that: Name Address Amount"))
                }
            } else {
                reject(new Error(`Cannot import an empty file`))
            }
        })
    }
}

export default CSV;