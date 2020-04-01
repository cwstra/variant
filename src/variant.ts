import {Identity, Func, identityFunc, FuncObject, ReturnTypes, Functions, ExtractOfUnion, strEnum} from './util';

// Consider calling this ObjectEntry or Entry. Also Pair? No, more like KVPair. Mapping?
export type TypeExt<K extends string, T> = K extends keyof infer LitK ? {[P in keyof LitK]: T} : never;
export type WithProperty<K extends string, T> = TypeExt<K, T>;

/**
 * The type marking metadata. It's useful to know the type of the items the function will generate.
 * 
 * It doesn't *really* matter if it's creator.outputType vs. creator.type, but
 * the latter has the advantage of being tolerable to the group of people who will
 * prefer to use [Animal.dog.type]: rather than dog: . 
 */
export type Outputs<K, T> = {
    key: K
    /**
     * The type of object created by this function.
     */
    type: T
};

/**
 * More specific toString();
 */
export type Stringable<ReturnType extends string> = {
    toString(): ReturnType;
}

/**
 * The constructor for one tag of a variant type. 
 */
export type VariantCreator<
    T extends string,
    Args extends any[] = [],
    Return extends {} = {},
    K extends string = 'type'>
= Stringable<T> & ((...args: Args) => Identity<WithProperty<K, T> & Return>) & Outputs<K, T>;

/**
 * The overall module of variants. This is equivalent to a polymorphic variant. 
 */
export type VariantModule<K extends string = 'type'> = {
    [name: string]: VariantCreator<string, any[], any, K>
}

/**
 * Use this function to generate a version of the `variant` factory function using
 * some arbitrary key. The default `variant` is just `variantFactory('type')`.
 * @param key The name of the property to use e.g. 'type', 'kind', 'version'
 */
export function variantFactory<K extends string>(key: K) {

    // Type fuckery ensues.
    function variantFunc<T extends string>(tag: T): VariantCreator<T, [], {}, K>
    function variantFunc<T extends string, F extends Func>(tag: T, func: F): VariantCreator<T, Parameters<F>, ReturnType<F>, K>
    function variantFunc<T extends string, F extends Func>(tag: T, func?: F) {
        let maker = (...args: Parameters<F>) => ({
            [key]: tag,
            ...(func ?? identityFunc)(...args),
        })
        const outputs = {
            key,
            type: tag,
        }
        return Object.assign(maker, outputs, {toString: function(this: Outputs<K, T>){return this.type}});
    }
    // the `variant()` function advertises the key it will use
    const outputKey = {outputKey: key};
    return Object.assign(variantFunc, outputKey);
}

/**
 * Create a new variant of a given type.
 * 
 *     const dog = variant('dog');
 *     const myDog = dog(); // {type: 'dog'}
 * 
 *     const dog = variant('dog', payload<string>());
 *     const myDog = dog('Bandit'); // {type: 'dog', payload: 'Bandit'}
 * 
 *     const dog = variant('dog', fields<{
 *         name: string;
 *         favoriteTreat?: string;
 *     });
 *     const myDog = dog({name: 'Bandit', favoriteTreat: 'carrots'}); // {type: 'dog}
 * 
 *     const dog = variant('dog', (name: string, favoriteTreat = 'kibble') => ({name, favoriteTreat}));
 *     const myDog = dog('Bandit'); // {type: 'dog', name: 'Bandit', favoriteTreat: 'kibble'}
 */
export const variant = variantFactory('type');
/**
 * Create
 */
export default variant;

type Creators<T extends FuncObject, PropName extends string = 'type'> = {
    [P in keyof T]: ReturnType<T[P]> extends WithProperty<PropName, infer TType> ? ((...args: Parameters<T[P]>) => Identity<ReturnType<T[P]> & WithProperty<PropName, TType>>) : never
}

/**
 * DEPRECATED. Use VariantOf
 */
export type VariantsOf<T, PropName extends string ='type'> = ReturnTypes<Creators<Functions<T>, PropName>>;
/**
 * DEPRECATED. Use VariantOf
 */
export type OneOf<T> = T[keyof T];

type FilterVariants<T, Type extends string, K extends string = any> = T extends VariantCreator<Type, any, any, K> ? T : never;

/**
 * Basically works like strEnum to generate an object where the property keys are the variant type strings.
 * @param variants 
 */
export function variantList<T extends VariantCreator<any, any, any, any>>(variants: Array<T>): {[P in T['type']]: FilterVariants<T, P>} {
    return variants.reduce((o, v) => ({
        ...o,
        [v.type]: v,
    }), Object.create(null))
}

/**
 * Give an array of output types for a given variant collection.
 * Useful for checking whether or not a message belongs in your
 * variant set at runtime.
 * @param variantObject 
 */
export function outputTypes<T extends {[name: string]: Outputs<string, string>}>(variantObject: T) {
    return Object.keys(variantObject).map(key => variantObject[key].type);
}

/**
 * Checks if an object is in a given variant module. You can give it the object
 * or any destructured subset or a variantList([...]) with specific items. Neat, huh?
 * 
 * TODO: This doesn't yet work for variants that use type keys besides 'type'. 
 * @param object 
 * @param variant 
 */
export function isOfVariant<T extends VariantModule>(object: WithProperty<'type', string>, variant: T): object is SumType<T> {
    return outputTypes(variant).some(type => type === object.type);
}


/**
 * Unused at the moment. Intended to develop the idea of an "ordered" variant.
 * @param variants 
 */
function progression<T extends VariantCreator<any, any, any, any>>(variants: Array<T>): {[P in T['type']]: FilterVariants<T, P>} {
    return variants.reduce((o, v) => ({
        ...o,
        [v.type]: v,
    }), Object.create(null))
}

/**
 * Built to describe an object with the same keys as a variant but instead of constructors
 * for those objects provides functions that handle objects of that type.
 */
export type Handler<T> = {
    [P in keyof T]: (variant: T[P]) => any
}

/**
 * Same as handler but needs to handle literals instead of variants. Used by matchLiteral.
 */
export type UnionHandler<T extends string> = {
    [P in T]: (variant: P) => any
}

/**
 * From a given union type, extract the the variant object's type. 
 */
export type VariantsOfUnion<T extends WithProperty<K, string>, K extends string = 'type'> = {
    [P in T[K]]: ExtractOfUnion<T, P, K>
}
type Defined<T> = T extends undefined ? never : T;

/**
 * Match a variant against it's possible options and do some processing
 * based on the type of variant received. 
 * @param obj the variant in question
 * @param handler an object whose keys are the type names of the variant's type and values are handler functions for each option.
 * @param {string?} typeKey override the property to inspect. By default, 'type'.
 * @returns {The union of the return types of the various branches of the handler object}
 */
export function match<
    T extends WithProperty<K, string>,
    H extends Handler<VariantsOfUnion<T, K>>,
    K extends string = 'type'
> (
    obj: T,
    handler: H,
    typeKey?: K,
): ReturnType<H[T[K]]>{
    const typeString = obj[typeKey ?? 'type' as K];
    return handler[typeString]?.(obj as any);
}

/**
 * Match a variant against some of its possible options and do some
 * processing based on the type of variant received. May return undefined
 * if the variant is not accounted for by the handler.
 * @param obj 
 * @param handler 
 * @param typeKey override the property to inspect. By default, 'type'.
 */
export function partialMatch<
    T extends WithProperty<K, string>,
    H extends Handler<VariantsOfUnion<T, K>>,
    K extends string = 'type'
> (
    obj: T,
    handler: Partial<H>,
    typeKey?: K,
): ReturnType<Defined<H[T[K]]>> | undefined {
    return match(obj, handler as H, typeKey);
};

/**
 * Match a literal against some of its possible options and do some processing based
 * on the type of literla received. Works well with strEnum
 * @param literal
 * @param handler 
 */
export function matchLiteral<T extends string, H extends UnionHandler<T>>(literal: T, handler: H): ReturnType<H[T]> {
    return handler[literal]?.(literal);
}

/**
 * An object that has the same keys as a variant but has arbitrary values for the data. 
 * a.k.a. a lookup table.
 */
export type Lookup<T> = {
    [P in keyof T]: any
}

/**
 * Map a variant to some value based on the type of variant provided.
 * @param obj 
 * @param handler 
 * @param typeKey 
 */
export function lookup<T extends WithProperty<K, string>, L extends Lookup<VariantsOfUnion<T, K>>, K extends string = 'type'>(obj: T, handler: L, typeKey?: K): ReturnType<L[T[K]]> {
    const typeString = obj[typeKey ?? 'type' as K];
    return handler[typeString];
}
/**
 * Map a variant to some value or undefined based on the type of variant
 * provided. If he handler does not account for your use case, undefined
 * will be returned. The type of undefined is the union of the various
 * values in the object. 
 * @param obj 
 * @param handler 
 * @param typeKey 
 */
export function partialLookup<T extends WithProperty<K, string>, L extends Lookup<VariantsOfUnion<T, K>>, K extends string = 'type'>(obj: T, handler: Partial<L>, typeKey?: K): ReturnType<L[T[K]]> | undefined {
    // Takes advantage of the fact that handler with missing keys will return undefined.
    return lookup(obj, handler as L, typeKey);
}

export type AugmentVariant<T extends VariantModule, U> = {
    [P in keyof T]: ((...args: Parameters<T[P]>) => Identity<ReturnType<T[P]> & U>) & Outputs<T[P]['key'], T[P]['type']>
}

export function cast<O extends WithProperty<K, string>, T extends O[K], K extends string = 'type'>(obj: O, _type: T, _typeKey?: K) {
    return obj as Specific<O, T, K>;
}
export function narrow<O extends WithProperty<K, string>, T extends O[K], K extends string = 'type'>(obj: O, type: T, typeKey?: K) {
    const typeString = obj[typeKey ?? 'type' as K];
    return typeString === type ? obj as Specific<O, T, K> : undefined;
}

/**
 * Expand the functionality of a variant as a whole by tacking on properties
 * generated by a thunk.
 * @param variantDef 
 * @param f 
 */
export function augment<T extends VariantModule, F extends Func>(variantDef: T, f: F) {
    return Object.keys(variantDef).reduce((acc, key) => {
        const augmentedFuncWrapper = (...args: any[]) => (Object.assign({}, f(), variantDef[key](...args)));
        return {
            ...acc,
            [key]: Object.assign(augmentedFuncWrapper, {key: variantDef[key].key, type: variantDef[key].type})
        };
    }, {} as AugmentVariant<T, ReturnType<F>>);
}


type FilterNeverTypedVariants<T extends WithProperty<K, string | never>, K extends string = 'type'> = T extends WithProperty<K, never> ? never : T;

/**
 * Select a single manifestation of a variant type based on the type name. 
 */
export type Specific<T extends WithProperty<K, string>, TType extends string = string, K extends string = 'type'> = Identity<FilterNeverTypedVariants<T & WithProperty<K, TType>, K>>;

export type SumType<T, K extends string = 'type'> = OneOf<VariantsOf<T, K>>;
export type KeysOf<T, K extends string = 'type'> = SumType<T, K>[K] & string;
export type TypeNames<T, K extends string = 'type'> = KeysOf<T, K> | undefined;
export type VariantOf<T, TType = undefined, K extends string = 'type'> = TType extends undefined ? SumType<T, K> : TType extends KeysOf<T, K> ? ExtractOfUnion<SumType<T, K>, TType, K> : SumType<T, K>;

export function keynum<T extends VariantModule>(variantDef: T): {[P in KeysOf<T>]: P} {
    return strEnum(outputTypes(variantDef)) as any;
}

export type Matrix<T extends VariantModule> = {
    [P in KeysOf<T>]: Specific<SumType<T>, P>
}

export type Flags<T extends VariantModule> = Partial<Matrix<T>>;

export function flagList<T extends WithProperty<K, string>, K extends string = 'type'>(flags: T[]): {[P in T[K]]: Specific<T, P, K>} {
    return flags.reduce((o, v) => ({
        ...o,
        [v.type]: v,
    }), Object.create(null))
}
