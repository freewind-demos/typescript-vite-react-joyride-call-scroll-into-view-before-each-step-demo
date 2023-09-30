import React, {FC, useLayoutEffect, useMemo, useState} from 'react';
import './Hello.pcss';
import Joyride, {STATUS, Step} from 'react-joyride';

type Props = {};


export const Hello: FC<Props> = ({}) => {
    const [running, setRunning] = useState<boolean>(false);
    const [readyStepIndex, setReadyStepIndex] = useState<number | undefined>(undefined);

    const steps = useMemo<Step[]>(() => {
        return [
            {
                target: '.step1',
                content: 'This is my awesome feature!',
                disableBeacon: true,
            },
            {
                target: '.step2',
                content: 'This another awesome feature!',
                disableBeacon: true,
            },
            {
                target: '.step3',
                content: 'Step 3',
                disableBeacon: true,
            },
        ]
    }, []);

    const onBeforeStep = (stepIndex: number) => {
        if (stepIndex === readyStepIndex) return;

        setRunning(false);
        document.querySelector<HTMLElement>(steps[stepIndex].target as string)?.scrollIntoView();
        setTimeout(() => {
            setReadyStepIndex(stepIndex);
            setRunning(true);
        })
    };

    return <div>
        <button onClick={() => setRunning(true)}>Guide me ({String(running)})</button>
        <Joyride
            run={running}
            steps={steps}
            stepIndex={readyStepIndex}
            continuous
            showProgress={true}
            spotlightClicks={false}
            scrollOffset={200}
            disableScrollParentFix={true}
            showSkipButton={true}
            callback={(state) => {
                console.log("### state", state)
                if (state.type === "step:before") {
                    onBeforeStep(state.index);
                    return;
                }
                if (([STATUS.FINISHED, STATUS.SKIPPED]).includes(state.status as any)) {
                    setRunning(false);
                    setReadyStepIndex(undefined);
                }
            }}

        />
        <div className="step1" style={{border: '2px solid red', height: 100}}>
            Hello, step 1
        </div>
        <div className="step2" style={{border: '2px solid blue', height: 200}}>
            Hello, step 2
        </div>
        <div className="step3" style={{border: '2px solid yellow', height: 200}}>
            Hello, step 3
        </div>
    </div>;
}
