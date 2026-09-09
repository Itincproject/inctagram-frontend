"use client";

import {
    FC,
    useEffect,
    useRef,
    useState,
} from "react";

import styles from "./Select.module.css";

export interface SelectOption {
    value: string;
    label: string;
    flag?: string;
}

interface SelectProps {
    options: SelectOption[];
    value?: string | null;
    onChange?: (value: string) => void;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export const Select: FC<SelectProps> = ({
                                            options,
                                            value,
                                            onChange,
                                            label,
                                            placeholder = "Select...",
                                            disabled = false,
                                            className,
                                        }) => {
    const [active, setActive] = useState(false);

    const [highlightedValue, setHighlightedValue] =
        useState<string | null>(value ?? null);

    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(
                    event.target as Node
                )
            ) {
                setActive(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const selectedOption =
        options.find(
            (option) => option.value === value
        ) ?? null;

    const highlightedOption =
        options.find(
            (option) =>
                option.value === highlightedValue
        ) ?? null;

    const toggleItems = () => {
        if (disabled) {
            return;
        }

        if (!active) {
            setHighlightedValue(
                value ??
                options[0]?.value ??
                null
            );
        }

        setActive((prev) => !prev);
    };

    const selectOption = (optionValue: string) => {
        setHighlightedValue(optionValue);

        onChange?.(optionValue);

        setActive(false);
    };

    const moveHighlight = (
        direction: 1 | -1
    ) => {
        if (!options.length) {
            return;
        }

        const currentIndex =
            options.findIndex(
                (option) =>
                    option.value ===
                    highlightedValue
            );

        let nextIndex: number;

        if (currentIndex === -1) {
            nextIndex =
                direction === 1
                    ? 0
                    : options.length - 1;
        } else {
            nextIndex =
                currentIndex + direction;
            if (nextIndex < 0) {
                nextIndex =
                    options.length - 1;
            }
            if (
                nextIndex >=
                options.length
            ) {
                nextIndex = 0;
            }
        }
        setHighlightedValue(
            options[nextIndex].value
        );
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>
    ) => {
        if (disabled) {
            return;
        }
        switch (e.key) {
            case "Enter": {
                e.preventDefault();
                if (!active) {
                    toggleItems();
                } else if (highlightedOption) {
                    selectOption(
                        highlightedOption.value
                    );
                }
                break;
            }
            case " ": {
                e.preventDefault();

                if (!active) {
                    toggleItems();
                } else if (highlightedOption) {
                    selectOption(
                        highlightedOption.value
                    );
                }
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                if (!active) {
                    setActive(true);
                    setHighlightedValue(
                        value ??
                        options[0]?.value ??
                        null
                    );
                } else {
                    moveHighlight(1);
                }

                break;
            }
            case "ArrowUp": {
                e.preventDefault();
                if (!active) {
                    setActive(true);
                    setHighlightedValue(
                        value ??
                        options[
                        options.length - 1
                            ]?.value ??
                        null
                    );
                } else {
                    moveHighlight(-1);
                }
                break;
            }
            case "Escape": {
                e.preventDefault();
                setActive(false);
                break;
            }
        }
    };

    return (
        <div
            ref={selectRef}
            className={`${styles.selectContainer} ${
                className ?? ""
            }`}
        >
            {label && (
                <div className={styles.label}>
                    {label}
                </div>
            )}

            <button
                type="button"
                className={`
                    ${styles.selectBox}
                    ${active ? styles.open : ""}
                    ${disabled ? styles.disabled : ""}
                `}
                onClick={toggleItems}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={active}
            >
                {selectedOption?.flag && (
                    <img
                        src={selectedOption.flag}
                        alt=""
                        className={styles.flag}
                    />
                )}

                <span
                    className={`
                        ${styles.selectedValue}
                        ${
                        !selectedOption
                            ? styles.placeholder
                            : ""
                    }
                    `}
                >
                    {selectedOption
                        ? selectedOption.label
                        : placeholder}
                </span>

                <span
                    className={styles.arrow}
                    aria-hidden="true"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d={
                                active
                                    ? "M7 14L12 9L17 14"
                                    : "M7 10L12 15L17 10"
                            }
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>

            {active && (
                <div
                    className={styles.optionsList}
                    role="listbox"
                    aria-label={label}
                >
                    {options.map((option) => {
                        const isHighlighted =
                            option.value ===
                            highlightedValue;

                        const isSelected =
                            option.value === value;

                        return (
                            <div
                                key={option.value}
                                className={`
                                    ${styles.option}
                                    ${
                                    isHighlighted
                                        ? styles.highlighted
                                        : ""
                                }
                                    ${
                                    isSelected
                                        ? styles.selected
                                        : ""
                                }
                                `}
                                onMouseEnter={() =>
                                    setHighlightedValue(
                                        option.value
                                    )
                                }
                                onClick={() =>
                                    selectOption(
                                        option.value
                                    )
                                }
                                role="option"
                                aria-selected={
                                    isSelected
                                }
                            >
                                {option.flag && (
                                    <img
                                        src={option.flag}
                                        alt=""
                                        className={
                                            styles.flag
                                        }
                                    />
                                )}

                                <span
                                    className={
                                        styles.optionLabel
                                    }
                                >
                                    {option.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};