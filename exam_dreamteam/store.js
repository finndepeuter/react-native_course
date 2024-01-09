import { atom } from 'recoil';

export const playerState = atom({
    key: 'playerState',
    default: { dreamteam: '', level: '' },
});

export const dreamteamListState = atom({
    key: "dreamteamListState",
    default: ["" , "" ,""]
});