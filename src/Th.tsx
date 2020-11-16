import React, {useContext, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {InnerScrollTableContext} from "InnerScrollTable";

interface ThProps {
    className: string,
    thClassName: string
}

const borderSpacing = 2; // TODO: get it from table ref

const getPx = (value: string) => parseFloat(value.replace('px', ''));

const Th: React.FC<ThProps> = ({children, className, thClassName, ...props}) => {
    const hiddenHeaderRef = useRef<HTMLDivElement>();
    const headerRef = useRef<HTMLDivElement>();
    const thRef = useRef<HTMLTableHeaderCellElement>();
    const [width, setWidth] = useState(null);

    const headerHeight = useContext(InnerScrollTableContext);

    const updateSize = () => {
        const headStyles = window.getComputedStyle(headerRef.current);

        const leftBorderWidth = getPx(headStyles.getPropertyValue('border-left-width'));
        const rightBorderWidth = getPx(headStyles.getPropertyValue('border-right-width'));

        const leftPadding = getPx(headStyles.getPropertyValue('padding-left'));
        const rightPadding = getPx(headStyles.getPropertyValue('padding-right'));

        setWidth(hiddenHeaderRef.current.offsetWidth - leftBorderWidth - rightBorderWidth - leftPadding - rightPadding);
    };

    useEffect(() => {
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {updateSize()});

    return (
        <th ref={thRef} className={thClassName}>
            <div ref={hiddenHeaderRef} className={classNames(className, 'table-header-hidden')}>
                {children}
            </div>
            <div ref={headerRef} style={{width, top: borderSpacing - headerHeight}} className={classNames(className, 'table-header')} {...props}>{children}</div>
        </th>
    );
};

export default Th;