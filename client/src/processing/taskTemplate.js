import { combineParallelArrays } from 'processing/utility';

export const interpretTaskTemplate = (taskTemplate, taskCount) => {
    if (taskTemplate) {
        const flags = taskTemplate.match(
            /\$\{ *([nNlL]+)[ ,]*([0-9]*)[ ,]*([adAD]*) *\}/g
        );
        if (!flags) return 'ERROR: INVALID TEMPLATE';
        const settings = flags.map((el) => convertFlagToSettings(el));
        const strings = settings.map((el) =>
            convertSettingsToStrings(el, taskCount)
        );
        const combinedStrings = combineParallelArrays(strings);
        return getFullTaskStrings(combinedStrings, taskTemplate);
    } else return 'ERROR: TEMPLATE NOT ENTERED';
};

const getFullTaskStrings = (strings, template) => {
    return strings.map((el) => {
        let matchIndex = 0;
        return template.replace(/\$\{( *[nlNL][^}]*)\}/g, (s) => {
            return el[matchIndex++] || s;
        });
    });
};

const convertSettingsToStrings = (settings, count) => {
    return new Array(count).fill().map((el, i) => {
        const loop = { i, count };
        if (settings.numerical)
            return convertNumSettingToString(settings, loop);
        else return convertLetterSettingToString(settings, loop);
    });
};

const convertNumSettingToString = (settings, loop) => {
    const { i, count, ascending, digits } = { ...loop, ...settings };
    const num = ascending ? i : count - i - 1;
    const zeroes = Math.max(0, digits - num.toString().length);
    return `${'0'.repeat(zeroes)}${num}`;
};

const convertLetterSettingToString = (settings, loop) => {
    const { i, count, ascending } = { ...loop, ...settings };
    const num = ascending ? i % 26 : 25 - (i % 26);
    const alphaIteration = Math.floor(i / 26);
    return `${String.fromCharCode(97 + num)}${
        count > 26 ? alphaIteration : ''
    }`;
};

const convertFlagToSettings = (flag) => {
    const groups = flag.replace(/[\$\{\} ]/g, '').split(',');
    if (groups[0] === 'l' || groups[0] === 'L')
        return convertLetterFlag(groups);
    else if (groups[0] === 'n' || groups[0] === 'N')
        return convertNumberFlag(groups);
};

const convertLetterFlag = (groups) => ({
    numerical: false,
    digits: 1,
    ascending: convertAscendingFlag(groups[1])
});

const convertNumberFlag = (groups) => {
    let settings = { numerical: true, digits: 1, ascending: true };
    for (let i = 1; i < groups.length; i++) {
        if (parseInt(groups[i]) >= 0 && parseInt(groups[i]) <= 9)
            settings.digits = parseInt(groups[i]);
        else settings.ascending = convertAscendingFlag(groups[i]);
    }
    return settings;
};

const convertAscendingFlag = (flag) => {
    if (flag === 'a' || flag === 'A') return true;
    else if (flag === 'd' || flag === 'D') return false;
};
