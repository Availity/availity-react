import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import Disclaimer from '../src/Disclaimer';
import Agreement from '../src/Agreement';

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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem metus, commodo ac sagittis ac, fringilla vel
      diam. Etiam metus metus, tincidunt nec tellus a, accumsan rhoncus neque. Vivamus nec augue id elit ultricies
      mollis. Praesent porta metus sed mollis pellentesque. Vivamus interdum tellus ac luctus venenatis. Ut iaculis
      rhoncus nibh, in elementum elit commodo dictum. Aenean finibus odio elit, a dictum dolor fermentum sit amet.
    </Disclaimer>
  </div>
);
_Disclaimer.args = {
  styled: true,
};
_Disclaimer.storyName = 'disclaimer';

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Disclaimer Props</h5>
    <ArgsTable of={Disclaimer} />
    <h4>Availity Props</h4>
    <h5>Agreement Props</h5>
    <ArgsTable of={Agreement} />
  </>
);
