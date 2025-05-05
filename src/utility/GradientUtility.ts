import { FillGradient } from "pixi.js";

export class Gradient {
    public static bottomBar: FillGradient = new FillGradient({
        type: 'linear',
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        textureSpace: 'local',
    }).addColorStop(0, [0,0,0,0.3]).addColorStop(1, [0,0,0,0.5])

    public static frame: FillGradient = new FillGradient({
        type: 'linear',
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
        textureSpace: 'local',
    }).addColorStop(0, [0,0,0,0.5]).addColorStop(1, [0,0,0,0.3])

    public static title: FillGradient = new FillGradient({
        type: 'linear',
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        textureSpace: 'local',
    }).addColorStop(0, '#FED569').addColorStop(1, '#D9AF45')

    public static btnSelect: FillGradient = new FillGradient({
        type: 'linear',
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        textureSpace: 'local',
    }).addColorStop(0, '#FCFCFB').addColorStop(1, '#DDD9D0')

    public static message: FillGradient = new FillGradient({
        type: 'linear',
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        textureSpace: 'local',
    }).addColorStop(0, '#FFFFFF').addColorStop(1, '#DED9D0')
}