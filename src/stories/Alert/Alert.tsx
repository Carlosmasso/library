// Alert.tsx
import { TriangleAlert, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import styled from 'styled-components';

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: XCircle,
};

const colorMap = {
  info: "blue", 
  success: "green",
  warning: "orange",
  error: "red",
}

// 1. Contenedor principal
const StyledAlert = styled.div<{ $variant: string }>`
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1)};
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 8px;
  position: relative;
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  border: 1px solid ${({ $variant, theme }) => theme?.palette?.[$variant]?.main || 'transparent'};
  
  ${({ $variant, theme }) => `
    background-color: ${theme?.palette?.[$variant]?.light};
    color: ${theme?.palette?.[$variant]?.text};
  `};

  .title {
    margin: 0;
    font-weight: 600;
    font-size: ${({ theme }) => theme.sizes.medium.fontSize};
  }
  .description {
    margin: 0;
    font-size: ${({ theme }) => theme.sizes.small.fontSize};
    color: ${({ theme, $variant }) => theme?.palette?.[$variant]?.text || 'inherit'};
  }
`;

// 2. Sub-componentes estilizados
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
  gap: ${({ theme }) => theme.spacing(0.25)};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  opacity: 0.7;
  display: flex;
  &:hover { opacity: 1; }
`;

// 3. El componente final
export const Alert = ({ variant = 'info', title, description, onClose }: any) => {
  const Icon = iconMap[variant];
  const color = colorMap[variant] || 'blue';

  return (
    <StyledAlert $variant={color}>
      {Icon && (
        <IconWrapper>
          <Icon size={20} />
        </IconWrapper>
      )}
      
      <Content>
        <h4 className='title'>{title}</h4>
        {description && <p className='description'>{description}</p>}
      </Content>

      {onClose && (
        <CloseButton onClick={onClose}>
          <X size={12} />
        </CloseButton>
      )}
    </StyledAlert>
  );
};
