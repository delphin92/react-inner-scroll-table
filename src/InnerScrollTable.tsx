import React, {createContext, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {max} from "lodash";
import "./InnerScrollTable.scss";

export interface InnerScrollTableProps {
    wrapperClassName?: string;
    scrollWrapperClassName?: string;
}

export const InnerScrollTableContext = createContext(null);

const InnerScrollTable: React.FC<InnerScrollTableProps> = ({children, wrapperClassName, scrollWrapperClassName, ...props}) => {
    const tableRef = useRef<HTMLTableElement>();

    const [headerHeight, setHeaderHeight] = useState(21);
    const [, scheduleUpdate] = useState<Date>();

    useEffect(() => {
        const updateSize = () => {
            scheduleUpdate(new Date());
        };

        updateSize();

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const maxThHeight = max([...tableRef.current.rows[0].getElementsByClassName('table-header')]
            .map((node: HTMLElement) => node.offsetHeight));
        setHeaderHeight(maxThHeight);
    });

    return (
        <div className={classNames('scrollable-table', wrapperClassName)}>
            <div style={{top: headerHeight}} className={classNames('scroll-wrapper', scrollWrapperClassName)}>
                <div className="scroll">
                    <InnerScrollTableContext.Provider value={headerHeight}>
                        <table ref={tableRef} {...props}>
                            {children}
                        </table>
                    </InnerScrollTableContext.Provider>
                </div>
            </div>
        </div>
    );
};

export default InnerScrollTable;