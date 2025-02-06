import type { Request, Response } from 'express'
import Expense from '../models/Expense'

export class ExpensesController {
    static create = async (req: Request, res: Response) => {
        try {
            const expense = await Expense.create(req.body)
            expense.budgetId = req.budget.id
            await expense.save()
            res.status(201).json({message: 'Gasto creado correctamente'})
        } catch (error) {
            // console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }
  
    static getById = (req: Request, res: Response) => {
        try {
            res.json(req.expense)
        } catch (error) {
            // console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static updateById = async (req: Request, res: Response) => {
        await req.expense.update(req.body)
        res.json('Gasto actualizado correctamente')
    }
  
    static deleteById = async (req: Request, res: Response) => {
        await req.expense.destroy()
        res.json('Gasto eliminado correctamente')
    }
}