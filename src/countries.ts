export interface CountryOriginal {
    name: string;
    bounds: [[number, number], [number, number]][];
}

export interface Country extends CountryOriginal {
    cc: string;
    title: string;
}

export const countriesOriginal: CountryOriginal[] = [
    {
        name: 'canada_ca',
        bounds: [
            [
                [40, -136],
                [68.9703832, -51],
            ],
        ],
    },
];

const cc2emoji = (cc: string): string => {
    const offset = 127397;
    const f = cc.codePointAt(0)!;
    const s = cc.codePointAt(1)!;
    return String.fromCodePoint(f + offset) + String.fromCodePoint(s + offset);
};

const getCC = (name: string) => {
    const parts = name.split('_');
    return parts.pop();
};

const beautifyCountryName = (name: string) => {
    const parts = name.split('_');
    const cc = parts.pop(); // remove the last part
    const emoji = cc && cc2emoji(cc.toUpperCase());
    const formattedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
    return `${emoji} ${formattedParts.join(' ')}`;
};

export const countries = countriesOriginal.map(country => {
    return {
        ...country,
        cc: getCC(country.name),
        title: beautifyCountryName(country.name),
    };
});