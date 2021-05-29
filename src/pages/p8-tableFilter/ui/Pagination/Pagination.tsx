import React, {CSSProperties, ReactNode} from 'react';

interface IPaginationProps {
    page: number;
    pageCount: number;
    productTotalCount: number;
    getPage: (newPage: number, newPageCount: number) => void;

    title?: ReactNode;
    paginationStyle?: CSSProperties;
    buttonStyle?: CSSProperties;
    selectStyle?: CSSProperties;
}

const Pagination: React.FC<IPaginationProps> = (
    {
        page, pageCount, productTotalCount, getPage,

        title = 'Pagination ', paginationStyle,
        buttonStyle, selectStyle
    }
) => {
    let pages = [];
    const lastPage = Math.ceil(productTotalCount / pageCount)

    for (let i = 1; i <= lastPage; i++) pages.push((
        <button
            key={i}
            style={{background: page === i ? 'rgb(143,143,143)' : undefined,
                    color: page === i ? 'white' : undefined, ...buttonStyle}}
            onClick={() => getPage(i, pageCount)}
        >
            {i}
        </button>
    ));

    if ((page + 4) < lastPage) {
        pages[page + 2] = (
            <span key={page + 3} style={buttonStyle}>
                - ... -
            </span>
        );
        pages = pages.filter((p, i) => i < (page + 3) || i === (lastPage - 1));
    }
    if (page > 5) {
        pages[1] = (
            <span key={2} style={buttonStyle}>
                - ... -
            </span>
        );
        pages = pages.filter((p, i) => i < 2 || i > page - 4);
    }
    const prevPage = () => {
        getPage(page - 1, pageCount);
        // if ((currentPage - 1) % pageNumberLimit == 0) {
        //     setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        //     setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        // }
    }
    const nextPage = () => {
        getPage(page + 1, pageCount);
        // if (currentPage + 1 > maxPageNumberLimit) {
        //     setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        //     setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        // }
    }


    return (
        <div style={{
            margin: '0 10px', minHeight: '50px', justifyContent: 'center',
            alignItems: 'center', display: 'flex', ...paginationStyle, flexDirection: 'column'
        }}>
            <div>{title} </div>

            <div style={{
                display: 'flex'
            }}><select value={pageCount} onChange={e => getPage(page, Number(e.currentTarget.value))}
                       style={{
                           ...selectStyle,
                           marginRight: '5px'
                       }}>
                <option value={4}>4</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
                <div style={{
                    marginLeft: '5px',
                    marginRight: '5px',
                    display: 'flex'
                }}>
                    <button onClick={prevPage}>PREV</button>
                </div>
                {pages}
                <div style={{
                    marginLeft: '5px',
                    marginRight: '5px',
                    display: 'flex'
                }}>
                    <button onClick={nextPage}>NEXT</button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;