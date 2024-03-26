import { ButtonComponent } from '../components/Button/index';

export default function TestComponents() {
  return (
    <div>
      <ButtonComponent title="Teste" handleClick={() => console.log('clicou')} />
    </div>
  );
}
