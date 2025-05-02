import { useLoadingStore } from "../../stores/useLoadingStore"

function LoadingBar() {
    const { percent } = useLoadingStore()
    const loadPercent = `${(percent * 100).toFixed()}%`
    return (
        <div id="ProgressBarContainer">
            <div id="ProgressBarBG">
                <div id="ProgressBar" style={{width: loadPercent}}></div>
            </div>
            <div id="ProgressText">{loadPercent}</div>
        </div>
    )
}

function LoadingPage() {
    return (
        <div id="LoadingPage">
                <div id="Loader">
                <div id="LoaderIconContainer">
                    <img id="LoaderIcon" src="common/loader/icon.svg" alt="" />
                </div>
                <LoadingBar />
            </div>
        </div>
    )
}

export default function Loading() {
    const isVisible = useLoadingStore((state) => state.visible)

    return (
        isVisible && <LoadingPage />
    )
}