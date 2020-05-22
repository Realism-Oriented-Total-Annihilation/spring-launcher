//
// Merges Classes in the classical Mixin approach
//


export function mixin(derived: any, bases: any[])
{
    for (let base of bases) {
        for (let name of Object.getOwnPropertyNames(base.prototype)) {
            Object.defineProperty(derived.prototype, name, <any>Object.getOwnPropertyDescriptor(base.prototype, name));
        }
    }
}
