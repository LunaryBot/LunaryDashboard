interface IThemeColors {
    band?: string;
    mode?: 'dark' | 'light';
}

interface IBaseColors {
    background: string;
    backgroundSecondary: string;
    ui: string;
    flow: string;
    text: string;
    overlay: string;
    icon: string | null;
    gradient: string;
} 

const blackColor = '#000000';
const whiteColor = '#ffffff';

const basesColors = {
    dark: {
        background: '#141520',
        backgroundSecondary: '#20212B',
        ui: whiteColor,
        flow: blackColor,
        text: whiteColor,
        overlay: blackColor,
        icon: whiteColor,
        gradient: 'rgba(160, 32, 240, 0.03)',
    },
    light: {
        background: '#fff',
        backgroundSecondary: '#f2f2f2',
        ui: blackColor,
        flow: whiteColor,
        text: blackColor,
        overlay: whiteColor,
        icon: null,
        gradient: 'rgba(160, 32, 240, 0.13)',
    },
};

const tonalits = Object.entries({
    "5": '0d', 
    "10": '1a', 
    "15": '26', 
    "20": '33', 
    "40": '66', 
    "60": '99', 
    "80": 'cc', 
    "100": ''
});

function ThemeVariables({ band = "#A020F0", mode = 'dark' }: IThemeColors = {}) {
    const baseColors: IBaseColors = basesColors[mode] || basesColors['dark'];
    
    const obj = {
        "--luny-colors-background": baseColors.background,
        "--luny-colors-backgroundSecondary": baseColors.backgroundSecondary,
        ...mapTonalits("--luny-colors-band", band),
        ...mapTonalits("--luny-colors-ui", baseColors.ui),
        ...mapTonalits("--luny-colors-flow", baseColors.flow),
        ...mapTonalits("--luny-colors-text", baseColors.text),
        "--luny-colors-overlay": baseColors.overlay + "E6",
        "--luny-colors-icon": baseColors.icon || band,
        ...mapTonalits("--luny-colors-light", whiteColor),
        ...mapTonalits("--luny-colors-dark", blackColor),
        "--luny-colors-green": "#61fe80",
        "--luny-colors-red": "#fe4854",
        "--luny-colors-gradient": `${baseColors.gradient}`,
    };

    return { 
        ...obj,
        toString: () => {
            return Object.entries({ ...obj }).map(([key, value]) => `${key}:${value};`).join("")
        }
    };
};

function mapTonalits(key: string, color: string) {
    return  Object.fromEntries(
        tonalits.map(([tonalit, value]) => [`${key}-${tonalit}`, `${color}${value}`])
    );
};
    
export default ThemeVariables;
module.exports.mapTonalits = mapTonalits;