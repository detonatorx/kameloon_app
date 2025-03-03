import React, { FC } from 'react'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import './ButtonSort.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Test } from '../../../../types';

interface ButtonSortProps {
  currentKey: keyof Test; 
    sortOrder: 'asc' | 'desc' | null;
    sortKey: keyof Test | null;
    onClick?: () => void;
}

export const ButtonSort: FC<ButtonSortProps> = ({ currentKey, sortOrder, sortKey, onClick }) => {
    const isSorting = sortKey === currentKey; 

    return (
        <button
            className={`btn ${isSorting && 'current'}`}
            onClick={onClick}
        >
            {isSorting && sortOrder === 'asc' ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
        </button>
    )
}
