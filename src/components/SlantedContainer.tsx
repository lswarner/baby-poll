import React, { FC } from 'react';
interface Props {
    children: React.JSX.Element;
    bg: string;
}

const SlantedContainer: FC<Props> = ({
    children,
    bg,
}) => {
    const background= `bg-${bg}`

    return (
        <div className={`${background} py-6 relative mb-10 -z-10`}>
            <div className={`${background} -rotate-2 h-10 w-full absolute -top-5 left-1 w-99/100`}>&nbsp;</div>
            <div className={`${background} my-3`}>
                {children}
            </div>
            <div className={`${background} -rotate-2 h-10 w-full absolute -bottom-5 -left-1`}>&nbsp;</div>
        </div>
    )
}

export default SlantedContainer;