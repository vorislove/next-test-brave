import React, { FC } from 'react';
import styled from 'styled-components';

export const Icon: FC<{ name: string }> = ({ name }) => {
	return <IconDiv className={`icon ti ti-${name}`}></IconDiv>;
};

const IconDiv = styled.div`
	display: inline-block;
	position: relative;
	font-size: 20px;
`;
