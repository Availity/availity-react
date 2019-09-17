import * as Reactstrap from 'reactstrap';
import AppIcon from '@availity/app-icon';
import Authorize from '@availity/authorize';
import Avatar from '@availity/avatar';
import Breadcrumbs from '@availity/breadcrumbs';
import Date, { DateField, DateRange, DateRangeField } from '@availity/date';
import { Form, FormGroup, Input, Field } from '@availity/form';
import Favorites, { FavoriteHeart } from '@availity/favorites';
import Select, { SelectField } from '@availity/select';
import PageHeader from '@availity/page-header';
import Feedback, { FeedbackForm } from '@availity/feedback';
import Icon from '@availity/icon';
import AvLink from '@availity/link';
import ListGroup from '@availity/list-group';
import ListGroupItem, { ListGroupItemStatus } from '@availity/list-group-item';
import Progress from '@availity/progress';
import Wizard, {
  WizardStep,
  WizardStepBadge,
  WizardStepTitle,
} from '@availity/step-wizard';
import TrainingLink from '@availity/training-link';
import { Disclaimer, Agreement } from '@availity/typography';
import * as yup from 'yup';
import moment from 'moment';


const scopes = {
  ...Reactstrap,
  AppIcon,
  Authorize,
  Avatar,
  Breadcrumbs,
  Date,
  DateField,
  DateRange,
  DateRangeField,
  Favorites,
  FavoriteHeart,
  Select,
  SelectField,
  PageHeader,
  Feedback,
  FeedbackForm,
  Icon,
  AvLink,
  ListGroup,
  ListGroupItem,
  ListGroupItemStatus,
  Progress,
  Wizard,
  WizardStep,
  WizardStepBadge,
  WizardStepTitle,
  TrainingLink,
  Disclaimer,
  Agreement,
  Form,
  FormGroup,
  Input,
  Field,
  yup,
  moment
};

export default scopes;
