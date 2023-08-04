import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VaccineService } from '../services';
import { VaccineDto } from '../dtos/vaccine.dto';

@ApiTags('Vaccines')
@Controller('/vaccines')
export class VaccineController {
  constructor(private readonly _vaccineService: VaccineService) {}

  @Get()
  @ApiOperation({ summary: 'Obtain all vaccines' })
  @ApiOkResponse({
    description: 'Lista de vacunas',
    type: [VaccineDto],
  })
  async getVaccines(): Promise<VaccineDto[]> {
    return await this._vaccineService.getVaccines();
  }
}
