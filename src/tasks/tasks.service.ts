import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';
import { Model, Query } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task-dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
	constructor(@InjectModel(Task.name) private _taskModel: Model<TaskDocument>) {}

	async create(req: any, createTaskDto: CreateTaskDto): Promise<Task> {
		try {
			const newTask = {
				...createTaskDto,
				created_by: req.user.id,
				created_at: format(new Date(), 'yyyy-MM-dd'),
				updated_at: format(new Date(), 'yyyy-MM-dd'),
				start_at: createTaskDto.start_at,
			};
			return await this._taskModel.create(newTask);
		} catch (err) {
			return err;
		}
	}

	async getAll(req: any, limit: number, page: number, sortField: string, sortDirection: 1 | -1, filterField: string, filterValue: string): Promise<{ data: Task[]; count: number }> {
		try {
			//Define sorting criteria
			const sortObj = {};
			sortObj[sortField] = sortDirection;
			//Define filtering criteria
			const filterObj = {};
			filterObj[filterField] = new RegExp(filterValue);

			const tasks = await this._getAllTodosByUser(req.user.id)
				.where(filterField && filterValue ? filterObj : {})
				.sort(sortField && sortDirection ? sortObj : { _id: 1 })
				.limit(limit)
				.skip(limit * page);
			const allTasksCount = await this._taskModel.countDocuments({});
			return {
				data: tasks,
				count: allTasksCount,
			};
		} catch (err) {
			return err;
		}
	}

	async getAllByDate(req: any, date: string): Promise<Task[]> {
		try {
			return await this._getAllTodosByUser(req.user.id).where('start_at', date);
		} catch (err) {
			return err;
		}
	}

	async update(task: UpdateTaskDto): Promise<Task> {
		try {
			return await this._taskModel.findByIdAndUpdate(task._id, { ...task, updatedAt: format(new Date(), 'yyyy-MM-dd') }, { new: true });
		} catch (err) {
			return err;
		}
	}

	async getOneById(id: string): Promise<Task> {
		try {
			return await this._taskModel.findOne({ _id: id });
		} catch (err) {
			return err;
		}
	}

	private _getAllTodosByUser(id: string): Query<any, any> {
		try {
			return this._taskModel.find().where('created_by', id);
		} catch (err) {
			return err;
		}
	}
}
