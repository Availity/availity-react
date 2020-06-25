import AppIcon from '@availity/app-icon';
import * as Reactstrap from 'reactstrap';
import './index.scss';
import Icon from '@availity/icon';
import Breadcrumbs from '@availity/breadcrumbs';
import { Disclaimer, Agreement } from '@availity/typography';
import Wizard, {
  WizardStep,
  WizardStepBadge,
  WizardStepTitle,
} from '@availity/step-wizard';
import * as yup from 'yup';
import ListGroupItem, { ListGroupItemStatus } from '@availity/list-group-item';
import { avDate, dateRange } from '@availity/yup';
import {
  Form,
  FormGroup,
  Input,
  Field,
  Feedback as FormFeedback,
  Radio,
  Checkbox,
  RadioGroup,
  CheckboxGroup,
} from '@availity/form';
import Date, { DateField, DateRange, DateRangeField } from '@availity/date';
import moment from 'moment';
import { Phone, validatePhone } from '@availity/phone';
import Select, { SelectField, ResourceSelect } from '@availity/select';
import TrainingLink from '@availity/training-link';
import {
  AvOrganizationSelect,
  AvRegionSelect,
} from '@availity/select/resources';

const scopes = {
  AppIcon,
  ...Reactstrap,
  Icon,
  Breadcrumbs,
  Disclaimer,
  Agreement,
  Wizard,
  WizardStep,
  WizardStepBadge,
  WizardStepTitle,
  ListGroupItem,
  ListGroupItemStatus,
  avDate,
  dateRange,
  yup,
  Form,
  FormGroup,
  Input,
  Field,
  FormFeedback,
  Radio,
  Checkbox,
  RadioGroup,
  CheckboxGroup,
  Date,
  DateField,
  DateRange,
  DateRangeField,
  moment,
  Phone,
  validatePhone,
  Select,
  SelectField,
  ResourceSelect,
  TrainingLink,
  AvOrganizationSelect,
  AvRegionSelect,
};
export default scopes;
