import React, {useContext, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {InnerScrollTableContext} from "InnerScrollTable";

interface ThProps {
    className: string,
    thClassName: string
}

const Th: React.FC<ThProps> = ({children, className, thClassName, ...props}) => {
    const hiddenHeaderRef = useRef<HTMLDivElement>();
    const headerRef = useRef();
    const [width, setWidth] = useState(null);

    const headerHeight = useContext(InnerScrollTableContext);

    const updateSize = () => {
        setWidth(hiddenHeaderRef.current.offsetWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {updateSize()});

    return (
        <th className={thClassName}>
            <div ref={hiddenHeaderRef} className={classNames(className, 'table-header-hidden')}>
                {children}
            </div>
            <div ref={headerRef} style={{width, top: 0 - headerHeight}} className={classNames(className, 'table-header')} {...props}>{children}</div>
        </th>
    );
};

export default Th;