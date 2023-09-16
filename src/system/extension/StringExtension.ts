/// <reference path="Extensions.d.ts" />
String.prototype.getNumber = function (): number
{
    return parseInt(this.toString());
}

String.prototype.toUCFirst = function (): string | undefined
{
    let context = this.toString();
    if (context.length > 0)
    {
        return context.charAt(0).toUpperCase() + context.slice(1);
    }
    else return undefined;
}

String.prototype.anan = function(): string
{
    return ""
}