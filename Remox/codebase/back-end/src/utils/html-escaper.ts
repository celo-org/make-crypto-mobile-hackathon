export function escaper(word:string){
    return word.replace(/&/g, "")
          .replace(/</g, "")
          .replace(/>/g, "")
          .replace(/'/g, "")
          .replace(/"/g, "");
}