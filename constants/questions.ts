import type { Question } from '@/types'

export const QUESTIONS: Question[] = [
  { dim: 'ex', text: '일을 마치고 나면 완전히 지쳐버린다는 느낌이 든다.' },
  { dim: 'ex', text: '퇴근할 때쯤 되면 녹초가 된 느낌이다.' },
  { dim: 'ex', text: '아침에 일어나 또 하루 일을 시작해야 한다는 생각이 피곤하다.' },
  { dim: 'ex', text: '하루 종일 일하는 것이 나에게 부담이 된다.' },
  { dim: 'ex', text: '직장에서 일하는 것에 완전히 지쳐있다.' },
  { dim: 'cy', text: '내 일의 의미에 대해 예전보다 덜 관심을 갖게 되었다.' },
  { dim: 'cy', text: '내 일이 정말 가치 있는 것인지 회의적으로 느껴진다.' },
  { dim: 'cy', text: '내가 하는 일이 조직이나 사회에 기여하는지 의구심이 든다.' },
  { dim: 'cy', text: '일에 열정적으로 임했던 때를 더 이상 기억하기 어렵다.' },
  { dim: 'cy', text: '직장에서 내가 하는 일이 나에게 별 의미가 없다고 느낀다.' },
  { dim: 'ef', text: '내가 하는 일에서 생기는 문제를 효과적으로 해결할 수 있다.' },
  { dim: 'ef', text: '내 직업 분야에서 가치 있는 성과를 내고 있다고 느낀다.' },
  { dim: 'ef', text: '내 일을 잘 해낼 수 있다는 자신감이 있다.' },
  { dim: 'ef', text: '나는 일을 하면서 많은 것을 성취하고 있다.' },
  { dim: 'ef', text: '무언가를 해냈을 때 진심으로 기쁨을 느낀다.' },
]

export const DIM_META: Record<string, { label: string; cls: string }> = {
  ex: { label: '소진', cls: 'tag-ex' },
  cy: { label: '냉소', cls: 'tag-cy' },
  ef: { label: '효능감', cls: 'tag-ef' },
}
