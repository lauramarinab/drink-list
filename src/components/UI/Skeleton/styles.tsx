import styled, { keyframes } from "styled-components";

const BackgroundAnimation = keyframes`
	0% {
		background-position: 0% 0%;
	}
	100% {
		background-position: -135% 0%;
	}	
`;

const SkeletonBox = styled.div`
  animation: ${BackgroundAnimation} 1.2s ease-in-out infinite;
  background: linear-gradient(90deg, #ece9e1 0%, #e8f2f2 50%, #ece9e1 100%);
  background-size: 400% 400%;
`;

const SkeletonLabel = styled(SkeletonBox)`
  width: 70%;
  height: 14px;
  border-radius: 10px;
`;

const WrapperDrinkCard = styled.div`
  position: relative;
  border-radius: 15px;
  padding: 10px;
  width: 200px;
`;

const ThumbDrinkCardSkeleton = styled(SkeletonBox)`
  border-radius: 20px;
  width: 190px;
  height: 190px;
`;

const ActionsDrinkCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  right: -20px;
  bottom: -15px;
`;

const SkeletonButton = styled(SkeletonBox)`
  width: 40px;
  height: 40px;
  justify-self: center;
  border-radius: 50%;
`;

export {
  BackgroundAnimation,
  WrapperDrinkCard,
  ThumbDrinkCardSkeleton,
  ActionsDrinkCard,
  SkeletonButton,
  SkeletonLabel,
};
