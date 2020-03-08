//
// Protocol Line Word Argument Interpreter
//


export class PtclWord
{
    private word: string;

    constructor(word: string)
    {
        this.word = word
    }

    public string(): string
    {
        return this.word;
    }

    public number(): number
    {
        return parseInt(this.word);
    }

    public bool(): boolean
    {
        let raw = this.word.toLowerCase();

        switch (raw.toLowerCase())
        {
            case "1":
            case "true":
            case "yes":
                return true;

            case "0":
            case "false":
            case "no":
                return false;

            default:
                throw `Invalid boolean: ${raw}`
        }
    }
}
