import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Agreement, Disclaimer } from '.';
// import README from '../README.md';

export default {
  title: 'Components/Typography',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const _Agreement: Story = () => (
  <div>
    <Agreement>
      <p>
        veritatis doloremque ut hic et etvitae amet natus perferendisdolores illum et rerum officia autiste deserunt
        quis sed corporis explicabo qui non pariaturaccusantium molestias non aut ut utnumquam qui vero est nihil eum
        ullam autemrerum repellat dicta quae dolorest occaecati sapiente a cupiditatereprehenderit quibusdam nam eveniet
        voluptatem quis soluta quamdelectus consequatur qui incidunt voluptatem consequuntur
      </p>
      <p>
        doloribus excepturi veritatis deleniti explicabo rerum quis aut sinta omnis numquamsaepe sint fugiatvoluptatem
        qui accusamus ad et idnon cumque aut molestiae hic corruptiveniam fuga libero vitae est ut facere optio
      </p>
      <p>
        veritatis doloremque ut hic et etvitae amet natus perferendisdolores illum et rerum officia autiste deserunt
        quis sed corporis explicabo qui non pariaturaccusantium molestias non aut ut utnumquam qui vero est nihil eum
        ullam autemrerum repellat dicta quae dolorest occaecati sapiente a cupiditatereprehenderit quibusdam nam eveniet
        voluptatem quis soluta quamdelectus consequatur qui incidunt voluptatem consequuntur
      </p>
      <p>
        doloribus excepturi veritatis deleniti explicabo rerum quis aut sinta omnis numquamsaepe sint fugiatvoluptatem
        qui accusamus ad et idnon cumque aut molestiae hic corruptiveniam fuga libero vitae est ut facere optio
      </p>
      <p>
        veritatis doloremque ut hic et etvitae amet natus perferendisdolores illum et rerum officia autiste deserunt
        quis sed corporis explicabo qui non pariaturaccusantium molestias non aut ut utnumquam qui vero est nihil eum
        ullam autemrerum repellat dicta quae dolorest occaecati sapiente a cupiditatereprehenderit quibusdam nam eveniet
        voluptatem quis soluta quamdelectus consequatur qui incidunt voluptatem consequuntur
      </p>
      <p>
        doloribus excepturi veritatis deleniti explicabo rerum quis aut sinta omnis numquamsaepe sint fugiatvoluptatem
        qui accusamus ad et idnon cumque aut molestiae hic corruptiveniam fuga libero vitae est ut facere optio
      </p>
      <p>
        veritatis doloremque ut hic et etvitae amet natus perferendisdolores illum et rerum officia autiste deserunt
        quis sed corporis explicabo qui non pariaturaccusantium molestias non aut ut utnumquam qui vero est nihil eum
        ullam autemrerum repellat dicta quae dolorest occaecati sapiente a cupiditatereprehenderit quibusdam nam eveniet
        voluptatem quis soluta quamdelectus consequatur qui incidunt voluptatem consequuntur
      </p>
      <p>
        doloribus excepturi veritatis deleniti explicabo rerum quis aut sinta omnis numquamsaepe sint fugiatvoluptatem
        qui accusamus ad et idnon cumque aut molestiae hic corruptiveniam fuga libero vitae est ut facere optio
      </p>
      <p>
        veritatis doloremque ut hic et etvitae amet natus perferendisdolores illum et rerum officia autiste deserunt
        quis sed corporis explicabo qui non pariaturaccusantium molestias non aut ut utnumquam qui vero est nihil eum
        ullam autemrerum repellat dicta quae dolorest occaecati sapiente a cupiditatereprehenderit quibusdam nam eveniet
        voluptatem quis soluta quamdelectus consequatur qui incidunt voluptatem consequuntur
      </p>
      <p>
        doloribus excepturi veritatis deleniti explicabo rerum quis aut sinta omnis numquamsaepe sint fugiatvoluptatem
        qui accusamus ad et idnon cumque aut molestiae hic corruptiveniam fuga libero vitae est ut facere optio
      </p>
    </Agreement>
  </div>
);
_Agreement.storyName = 'agreement';

export const _Disclaimer: Story = ({ styled }) => (
  <div>
    <Disclaimer styled={styled}>
      I have fully read this agreement and understand that I am entering into a legally binding agreement and that my
      organization is bound by the terms and conditions contained therein. I attest and certify that I am the Primary
      Controlling Authority for the organization named herein and that I possess the necessary legal authority to bind
      this organization. I further attest and certify my organization&apos;s designation as a Covered Entity under
      HIPAA, as more fully described in 45 CFR § 160.103.
    </Disclaimer>
  </div>
);
_Disclaimer.args = {
  styled: true,
};
_Disclaimer.storyName = 'disclaimer';
