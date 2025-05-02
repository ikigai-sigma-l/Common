import { FillGradient } from "pixi.js";

export class Gradient {
    public static bottomBar: FillGradient = new FillGradient({
        type: 'linear',
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        textureSpace: 'local',
    }).addColorStop(0, [0,0,0,0.3]).addColorStop(1, [0,0,0,0.5])

    public static confirmBtn: FillGradient = new FillGradient({
        type: 'linear',
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        textureSpace: 'local',
    }).addColorStop(0, '#FFFFFF').addColorStop(1, '#DED9DD')

    public static popUpTitle: FillGradient = new FillGradient({
        type: 'linear',
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        textureSpace: 'local',
    }).addColorStop(0, '#FFD569').addColorStop(1, '#D9AF45')

    public static btnSelect: FillGradient = new FillGradient({
        type: 'linear',
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        textureSpace: 'local',
    }).addColorStop(0, '#FCFCFB').addColorStop(1, '#DDD9D0')
}