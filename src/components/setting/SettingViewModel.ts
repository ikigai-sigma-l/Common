import * as PIXI from 'pixi.js'
import { Observable, UnSubscribes } from "../../observable/Observable";
import { PopUpState, usePopUpStore } from '../../stores/usePopUpStore';

import { useSettingStore } from '../../stores/useSettingStore';
import { SettingView } from './SettingView';
import { language } from '../../utility/Language';
import { useActiveResultStore } from '../../stores/useActiveResultStore';

export class SettingViewModel {

    private unScribes: UnSubscribes = null

    public initial() {
    }

    public release() {
        this.unScribes?.forEach((unScribe) => {
          if (unScribe) unScribe()
        })
        this.unScribes = null
    }

    public bind(view: SettingView) {
        this.release()

        this.unScribes = [
            useSettingStore.batterySaving.subscribe(
                (cur) => {
                    const battery = view.getBattery()
                    if (battery) battery.enable(cur)
                }
            ),
            useSettingStore.isMusicOn.subscribe(
                (cur) => {
                    const music = view.getMusic()
                    if (music) music.enable(cur)
                }
            ),
            useSettingStore.isSoundOn.subscribe(
                (cur) => {
                    const sound = view.getSound()
                    if (sound) sound.enable(cur)
                }
            ),
            this.registerLocalization(view),
            this.registerBatteryClickEvent(view),
            this.registerMusicClickEvent(view),
            this.registerSoundClickEvent(view),
            this.registerHistoryClickEvent(view),
            this.registerExitClickEvent(view),
            this.registerCloseClickEvent(view)
        ]
    }

    private registerLocalization(view: SettingView) {
        const refresh = () => {
            const title = view.getObject('title') as PIXI.Text
            if (title) {
                title.text = language.text('SETTING_MENU')
            }

            const battery = view.getBattery()
            if (battery) {
                battery.title(language.text('GAME_SETTING_BATTERY_SAVER'))
                battery.describe(language.text('GAME_SETTING_BATTERY_SAVER_DESCRIPTION'))
            }

            const music = view.getMusic()
            if (music) {
                music.title(language.text('GAME_SETTING_AMBIENT_MUSIC'))
                music.describe(language.text('GAME_SETTING_AMBIENT_MUSIC_DESCRIPTION'))
            }

            const sound = view.getSound()
            if (sound) {
                sound.title(language.text('GAME_SETTING_SOUND_FX'))
                sound.describe(language.text('GAME_SETTING_SOUND_FX_DESCRIPTION'))
            }

            const history = view.getHistory()
            if (history) {
                history.title(language.text('GAME_SETTING_GAME_HISTORY'))
                //history.icon()
            }

            const exit = view.getExit()
            if (exit) {
                exit.title(language.text('GAME_SETTING_EXIT_GAME'))
                //exit.icon()
            }
        }
        
        refresh()
        return useActiveResultStore.subscribe(
            (state) => state.data,
            (cur) => {
                refresh()
            }
        )
    }

    private registerBatteryClickEvent(view: SettingView) {
        const touch = view.getBattery()?.touch()
        if (!touch) return () => {}

        touch.on('pointerup', () => {
            const batterySaving = useSettingStore.batterySaving.get()
            useSettingStore.batterySaving.set(!batterySaving)
        })
        
        return () => {
            touch.off('pointerup')
        }
    }

    private registerMusicClickEvent(view: SettingView) {
        const touch = view.getMusic()?.touch()
        if (!touch) return () => {}

        touch.on('pointerup', () => {
            const isMusicOn = useSettingStore.isMusicOn.get()
            useSettingStore.isMusicOn.set(!isMusicOn)
        })
        
        return () => {
            touch.off('pointerup')
        }
    }

    private registerSoundClickEvent(view: SettingView) {
        const touch = view.getSound()?.touch()
        if (!touch) return () => {}

        touch.on('pointerup', () => {
            const isSoundOn = useSettingStore.isSoundOn.get()
            useSettingStore.isSoundOn.set(!isSoundOn)
        })
        
        return () => {
            touch.off('pointerup')
        }
    }

    private registerHistoryClickEvent(view: SettingView) {
        const touch = view.getHistory()?.touch()
        if (!touch) return () => {}

        touch.on('pointerup', () => {
            // TODO: open history
        })
        
        return () => {
            touch.off('pointerup')
        }
    }

    private registerExitClickEvent(view: SettingView) {
        const touch = view.getHistory()?.touch()
        if (!touch) return () => {}

        touch.on('pointerup', () => {
            // TODO: exit
        })
        
        return () => {
            touch.off('pointerup')
        }
    }

    private registerCloseClickEvent(view: SettingView) {
        const close = view.getObject('close') as PIXI.Sprite
        if (!close) return () => {}
        
        close.on('pointerup', () => usePopUpStore.current.set(PopUpState.None))
        
        return () => {
            close.off('pointerup')
        }
    }
}