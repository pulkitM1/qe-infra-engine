import makeDataAutoId from '../../../util/make-data-auto-id';
import { ContainerGapDirection, ContainerGapSize } from './component-container.types';

export type ComponentContainerProps = {
  gap?: ContainerGapSize;
  gapDirection?: ContainerGapDirection;
  children: React.ReactNode;
  dataAutoId?: string;
};

const containerGapSize = {
  small: '2',
  medium: '6',
  large: '8',
  xlarge: '12',
  default: '4',
} as const;

const containerGapDirection = {
  both: 'my',
  top: 'mt',
  bottom: 'mb',
  'offset-top': '-mt',
  'offset-bottom': '-mb',
  'offset-both': '-my',
} as const;

export function ComponentContainer({ gap = 'default', gapDirection = 'both', children, dataAutoId }: ComponentContainerProps) {
  const maybeDataAutoId = makeDataAutoId(dataAutoId, 'component-container');

  return (
    <div data-auto-id={maybeDataAutoId()} className={`${containerGapDirection[gapDirection]}-${containerGapSize[gap]}`}>
      {children}
    </div>
  );
}
