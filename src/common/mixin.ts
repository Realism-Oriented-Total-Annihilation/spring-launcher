//
// Merges Classes in the classical Mixin approach
//


export function mixin(derived_ctor: any, base_ctors: any[])
{
    for (let base_ctor of base_ctors)
    {
        let property_names = Object.getOwnPropertyNames(base_ctor.prototype);

        for (let prop_name in property_names)
        {
            let property_descriptor = Object.getOwnPropertyDescriptor(base_ctor.prototype, prop_name);

            Object.defineProperty(derived_ctor.prototype, name, <PropertyDescriptor>property_descriptor);
        }
    }
}
