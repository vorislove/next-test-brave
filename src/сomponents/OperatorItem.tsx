import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { StyledSpan } from './ui/Container.styled';

interface ILink {
	className?: string;
	img?: string;
	name: string;
	href: string;
}

export const OperatorItem: FC<ILink> = ({ className, name, img, href }) => {
	const firstChar = name.toString().trim();
	const image =
		img != '' ? (
			<Image src={img} alt={name} width={50} height={50} />
		) : (
			<StyledSpan fs="2.25rem">{firstChar[0].toUpperCase()}</StyledSpan>
		);

	return (
		<StyledLink>
			<Link href={href}>
				<a className={className}>
					<div>
						{image}
						<span>{name}</span>
					</div>
				</a>
			</Link>
		</StyledLink>
	);
};

const StyledLink = styled.div`
	font-size: 1.5rem;
	padding: 10px;
	border-bottom: 1px solid #e1e1e1;

	a div {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	a div span {
		margin-left: 30px;
	}

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
`;
